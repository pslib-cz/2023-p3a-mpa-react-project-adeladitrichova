import '../index.css';
import React from "react";

interface ButtonRedirectProps {
    buttonText: string;
    shadowColor: string;
    width: string;
}

export const ButtonRedirect: React.FC<ButtonRedirectProps> = ({ buttonText, shadowColor, width }) => {
    return (
        <>
            <button className="button button--primary"
                    style={{
                        boxShadow: `inset 0px 5px 1px 1px ${shadowColor}`,
                        width: width,
                    }}>
                <p className="text text--button">{buttonText}</p>
            </button>
        </>
    )

}
