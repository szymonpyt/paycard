import '../styles/paycardCard.css';

import chip from '../img/chip.png';

import React from 'react';
import { connect } from 'react-redux';

import { identificators } from './PaycardForm';

const CARDS_TYPE = {
    visa: '^4',
    amex: '^(34|37)',
    mastercard: '^5[1-5]',
    discover: '^6011',
    unionpay: '^62',
    troy: '^9792',
    diners: '^(30[0-5]|36)'
};

class Card extends React.Component{

    cardTypeSelector(cardNumber){
        const number = cardNumber;
        let re;
        for (const [card, pattern] of Object.entries(CARDS_TYPE)) {
            re = new RegExp(pattern);
            if (number.match(re) != null) {
                return card;
            }
        }

        return 'visa';
    }
    
    
    cardNumberChanger({cardNumber}){
        while(cardNumber.length < 16){
            cardNumber += '#';
        }
        let tempCardNumber = cardNumber;
        cardNumber = '';
        for(let index = 0; index <16; index++){
            if(index % 4 === 0){
                cardNumber += ' ';
            }

            if(index >3 && index < 12 && tempCardNumber[index] !== '#'){
                cardNumber += '*';
            }else{
                cardNumber += tempCardNumber[index];
            }
            
        }

        return cardNumber;
    }

    expirationDateChanger({ month, year }){
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        if(month){
            month = months.indexOf(month) + 1;
            if(month < 10){
                month = '0' + month;
            }
        }else{
            month = '00';
        }

        if(year){
            year = year.slice(-2, year.length);
        }else{
            year = '00';
        }
        return `${month}/${year}`;
    }

    cvvChanger({cvv}){
        let newCvv = '';
        
        while (newCvv.length < cvv.length){
            newCvv += '*';
        }

        return newCvv;
    }

    render(){
        const cardNumber = this.cardNumberChanger(this.props);
        const cardName = this.props.cardName || "John Smith";
        const expirationDate = this.expirationDateChanger(this.props.expirationDate);
        const cvv = this.cvvChanger(this.props);
        const cardTypeName = this.cardTypeSelector(this.props.cardNumber);

        if(this.props.selectedInputField === 'cvv'){
            return (
                <div className="paycardCard backside">
                    <div className="blackBelt">

                    </div>

                    <div className="cvvTitle">
                        CVV
                    </div>
                    <div className="cvvNumber">
                        {cvv}
                    </div>

                    <img 
                    className="cardType" 
                    src={`../img/card-type/${cardTypeName}.png`} 
                    alt="card type"
                    />
                </div>
            )
        }

        return (
            <div className="paycardCard frontside">
                <div className="firstRow">
                <img 
                    className="chip" 
                    src={chip}
                    alt="chip"
                 />
                <img 
                    className="cardType" 
                    src={`../img/card-type/${cardTypeName}.png`} 
                    alt="card type"
                    />
                </div>
               
                <div 
                    className={identificators.cardNumber === this.props.selectedInputField ?
                    "cardNumber outlined" :
                    "cardNumber"}
                
                >
                    {cardNumber}
                </div>
                
                <div className="lastRow">
                    <div className={identificators.cardName === this.props.selectedInputField ?
                        "cardName outlined" :
                        "cardName"}>
                        <div
                            className="label"
                        >
                            Card Holder
                        </div>
                        <div>
                            {cardName}
                        </div>
                    </div>
                    <div className={identificators.expirationMonth === this.props.selectedInputField || 
                        identificators.expirationYear === this.props.selectedInputField?
                        "expirationDate outlined" :
                        "expirationDate"}>
                            <div
                            className="label"
                        >
                            Expires
                        </div>
                        <div>
                            {expirationDate}
                        </div>
                    </div>
                </div>
                

                
            </div>
        )
    }
    
}

const mapStateToProps = state => ({
    cardNumber : state.paycard.cardNumber,
    cardName : state.paycard.cardName,
    expirationDate : state.paycard.expirationDate,
    cvv : state.paycard.cvv,
    selectedInputField : state.paycard.selectedInputField
})

export default connect(mapStateToProps) (Card);