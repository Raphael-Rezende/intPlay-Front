
// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
    const { buttonclick, text } = props;




    return (
        <div>
            <button onClick={buttonclick}>
                {text}
            </button>

        </div>
    )
}