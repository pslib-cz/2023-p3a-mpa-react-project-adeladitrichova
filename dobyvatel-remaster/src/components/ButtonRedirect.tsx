import '../index.css';

interface ButtonRedirectProps {
    buttonText: string;
    shadowColor: string;
}

export const ButtonRedirect: React.FC<ButtonRedirectProps> = ({buttonText, shadowColor}) => {
    return (
        <>
            <button className="button button--primary"
                    style={{
                        boxShadow: `inset 0px 5px 1px 1px ${shadowColor}`
                    }}>
                <p className="text text--button">{buttonText}</p>
            </button>
        </>
    )

}
