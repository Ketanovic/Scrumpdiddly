// import React from "react";
// import { useParams } from "react-router-dom";
// import { useGetAllRecipesQuery } from '../app/apiSlice';

// const RecipeDetails = () => {
//   const { name } = useParams();
//   const { data: recipe, isLoading} = useGetAllRecipesQuery(name)
//   console.log({recipe, isLoading});
//   // if (isLoading) return <div>Loading...</div>
//   return(
//     <div>
//       <h1>Recipes</h1>
//       <table className="table table-striped">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Category</th>
//             <th>Area</th>
//             <th>Instructions</th>
//             <th>ingredients</th>
//           </tr>
//         </thead>
//         <tbody>
//           {recipe.name.map((rec) => { console.log("aaaaaaaaaaaaaaaaaaaaaa", rec.ingredients["ingredients"])
//               return (
//                 <tr key={rec.name}>
//                   <td>{rec.name}</td>
//                   <td>{rec.category}</td>
//                   <td>{rec.area}</td>
//                   <td>{rec.instructions}</td>
//                   <td>{rec.ingredients.ingredients}</td>
//                   <td>
//                   </td>
//                 </tr>
//               );
//             })}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default RecipeDetails()
