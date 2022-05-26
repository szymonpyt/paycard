import '../styles/paycard.css';

import PaycardForm from './PaycardForm';
import PaycardCard from './PaycardCard';

export default function Paycard() {
    return (
        <div className="paycard">
            <PaycardCard />
            <PaycardForm />
        </div>
    )
}