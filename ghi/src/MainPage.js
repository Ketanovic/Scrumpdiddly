import { useNavigate } from "react-router-dom";
import scrumdiddly from './scrumdiddly.png'

function MainPage() {
  const navigate = useNavigate()
  return (
    <div className='center page-wrap'>
        <img src={scrumdiddly} className='logo' />
        <p className="lead mb-4">
          The premiere solution for making dinner at home easier!
        </p>
        <button type="submit" className="btn btn-primary" onClick={() => navigate("/login")}>To use our service, please login first by clicking me!</button>
      </div>
  );
}

export default MainPage;
