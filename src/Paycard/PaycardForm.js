import '../styles/paycardForm.css';

import { useState } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { changeCardNumber, changeCardName, changeExpirationDate, changeCVV, changeSelectedInputField } from '../Actions/PaycardActions';

export const identificators = {
        cardNumber : 'cardNumber',
        cardName : 'cardName',
        expirationMonth : 'expirationMonth',
        expirationYear : 'expirationYear',
        cvv : 'cvv'
    }


export default function PaycardForm(){
    const [submitted, setSubmitted] = useState(false);

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const paycardInformation = useSelector(state => state.paycard);
    const dispatch = useDispatch();

    const getNext10Years = currYear => {
        let years = [];
        for(let year = currYear; year < currYear + 10; year++){
            years.push(year);
        }

        return years;
    };
    
    const years = getNext10Years(new Date().getFullYear());

    const validateNumberInput = (value) => {
        const numbers = '0123456789';

        return numbers.includes(value);
    }

    const handleSelectedInputFieldChange = ({target}) => {
        dispatch(changeSelectedInputField(target.id))
    }

    const handleCardNumberChange = ({target}) =>{
        if((validateNumberInput(target.value[target.value.length-1]) 
            && target.value.length <= 16)
            || target.value.length === 0){
            dispatch(changeCardNumber(target.value));
        }
    }

    const handleCardNameChange = ({target}) =>{
        if(target.value.length < 25){
            dispatch(changeCardName(target.value));
        }
        
    }

    const handleExpirationDateChange = (month=paycardInformation.expirationDate.month,
        year=paycardInformation.expirationDate.year) =>{
        dispatch(changeExpirationDate({year, month}));
    }

    const handleExpirationMonthChange = ({target}) =>{
        handleExpirationDateChange(target.value);
    }

    const handleExpirationYearChange = ({target}) =>{
        handleExpirationDateChange( undefined, target.value);
    }

    const handleCVVChange = ({target}) =>{
        
        if((validateNumberInput(target.value[target.value.length-1]) 
        && target.value.length <= 4)
        || target.value.length === 0){
            dispatch(changeCVV(target.value));
        }
        
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        setSubmitted(true);

        if(!checkForErrors('cardNumber')
            && !checkForErrors('cardName')
            && !checkForErrors('expirationMonth')
            && !checkForErrors('expirationYear')
            && !checkForErrors('cvv')){
                //Form is validated and ready to be sent
                
                alert("Action!");
            }
    }

    const checkForErrors = (id) => {
        const {cardNumber, cardName, expirationDate, cvv} = paycardInformation;
        if(id === 'cardNumber' && cardNumber.length === 16){
            return false
        }else if(id === 'cardName' && cardName.length !== 0){
            return false;
        }else if(id === 'expirationMonth' && expirationDate.month){
            return false;
        }else if(id === 'expirationYear' && expirationDate.year){
            return false;
        }else if(id === 'cvv' && cvv.length === 4){
            return false;
        }
        return true;
    }

    return (
        <Form 
            className="paycard-form"
        >
            <Row>
                <Form.Group  as={Col} controlId={identificators.cardNumber}>
                <Form.Label>Card Number</Form.Label>
                <Form.Control
                    type="text" 
                    required
                    placeholder="Enter card number" 
                    onChange={handleCardNumberChange}
                    value={paycardInformation.cardNumber}
                    onFocus={handleSelectedInputFieldChange}
                    isInvalid={submitted && checkForErrors('cardNumber')}
                    />
                <Form.Control.Feedback type="invalid">
                  Enter proper 16-digits long card number.
                </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col} controlId={identificators.cardName}>
                <Form.Label>Card Name</Form.Label>
                <Form.Control 
                    type="text" 
                    required
                    placeholder="Enter card name" 
                    value={paycardInformation.cardName}
                    onChange={handleCardNameChange}
                    onFocus={handleSelectedInputFieldChange}
                    isInvalid={submitted && checkForErrors('cardName')}
                    />
                <Form.Control.Feedback type="invalid">
                  Enter proper name of a card holder.
                </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row>
                
                <Form.Group as={Col} controlId={identificators.expirationMonth}>
                <Form.Label>Expiration Date</Form.Label>
                <Form.Control 
                    as="select" 
                    required
                    onChange={handleExpirationMonthChange}
                    onFocus={handleSelectedInputFieldChange}
                    isInvalid={submitted && checkForErrors('expirationMonth')}
                    >  
                    <option disabled value="" selected>Month</option>
                    {months.map((month, index) => <option key={index}  value={month}>{month}</option>)}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Select a month.
                </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId={identificators.expirationYear}>
                <Form.Label>&nbsp;</Form.Label>
                <Form.Control 
                    as="select" 
                    required
                    onChange={handleExpirationYearChange}
                    onFocus={handleSelectedInputFieldChange}
                    isInvalid={submitted && checkForErrors('expirationYear')}
                    >
                    <option disabled value="" selected>Year</option>
                    {years.map((year, index) => <option key={index} value={year}>{year}</option>)}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Select a year.
                </Form.Control.Feedback>
                </Form.Group>

                <Form.Group  as={Col} controlId={identificators.cvv}>
                <Form.Label>CVV</Form.Label>
                <Form.Control 
                    type="text" 
                    required
                    placeholder="Enter CVV" 
                    onChange={handleCVVChange}
                    value={paycardInformation.cvv}
                    onFocus={handleSelectedInputFieldChange}
                    isInvalid={submitted && checkForErrors('cvv')}
                />
                <Form.Control.Feedback type="invalid">
                  Enter CVV number.
                </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row>
                <div className="text-center">
                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Submit button
                    </Button>
                </div>
                
            </Row>
            
            
        </Form>
    );
}
