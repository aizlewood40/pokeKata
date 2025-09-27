import * as React from "react";
import { useFormStatus } from "react-dom"


const SubmitButton: React.FC = (): React.JSX.Element => {
    const status = useFormStatus();
    return (
        <button>
            {status.pending ? "Saving...": "Save"}
        </button>
    )
};

export default SubmitButton;