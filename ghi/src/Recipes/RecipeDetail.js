import { useParams } from "react-router-dom";
import { useGetRecipeQuery } from "../app/apiSlice";

export default function RecipeDetailPage() {
    const { id } = useParams();
    const { data, isLoading } = useGetRecipeQuery(id);

    if (isLoading) return <>Loading...</>;

    return (
        <div className="page-wrap container">
            <div className="row">
                <div className="col-md-6">
                    <img
                        src={data.thumbnail}
                        className="img-fluid"
                        alt="Recipe Thumbnail"
                    />
                </div>
                <div className="col-md-6">
                    <div
                        className="card"
                        style={{ maxHeight: "800px", overflowY: "auto" }}
                    >
                        <div className="card-body">
                            <h2 className="card-title">{data.name}</h2>
                            <p className="card-text">
                                {data.area} {data.category}
                            </p>
                            <p className="card-text">{data.instructions}</p>
                            <div className="mt-4">
                                <table className="table table-bordered">
                                    <tbody>
                                        {data.ingredients.map(
                                            (ingnames, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        {ingnames[0].toUpperCase()}
                                                    </td>
                                                    <td>{ingnames[1]}</td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
