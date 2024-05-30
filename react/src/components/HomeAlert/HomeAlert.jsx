import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';

function HomeAlert() {
    const [show, setShow] = useState(true);

    if (show) {
        return (
        <Alert variant="light" onClose={() => setShow(false)} dismissible>
            <span><AddAlertOutlinedIcon></AddAlertOutlinedIcon> Hiboo CRM est en version 1.0 ✅</span>
        </Alert>
        );
    }
    //return <Button onClick={() => setShow(true)}>Show Alert</Button>;
}

export default HomeAlert;