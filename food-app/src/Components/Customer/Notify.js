const Notify = () => {
    const close = (e)=>{
        document.getElementById('modalnotifi').style.display = 'none';
    }
    return (
        <div id="modalnotifi">
            <div id="m2content">
                <p id="m2close" onClick={e=>close(e)}>X</p>
                <h2 id="m2message"></h2>
            </div>
        </div>
    )
}
export default Notify;