import img from "../../images/images.png";
import "../../App.css";
const NoPage = () =>
{
    return <>
        <img src={ img } alt="404 page" className="notFoundImg" />
    </>
};

export default NoPage