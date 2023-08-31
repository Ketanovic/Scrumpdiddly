import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate()
  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">Scrummy</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          The premiere solution for making dinner at home easier!
        </p>
        <button type="submit" className="btn btn-primary" onClick={() => navigate("/register")}>To use our service, please login first by clicking me!</button>
      </div>
    </div>
  );
}

export default MainPage;
