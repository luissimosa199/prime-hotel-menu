const LoadingModal = ({renderMessage, setLoadingModalVisibility}) => {

    return ( 
        <div className="loadingModal_container">
            <div className="loadingModal_inner">
                {renderMessage}
            </div>
        </div>
     );
}
 
export default LoadingModal;