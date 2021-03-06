import {

    sanityClient,
    urlFor,
    usePreviewSubscription,
    PortableText

} from "../../lib/sanity"
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/dist/client/image";
const recipeQuery = `*[_type == "recipe" && slug.current == $slug][0]{

    _id,
    name,
    slug,
    mainImage,

    ingredients[]{
        _key,
        unit,
        wholeNumber,
        fraction,
        ingredient -> {
             name
        }
    },
     instructions,
     likes
}`;


export default function OneRecipe({ data ,preview}) {
    const [likes, setLikes] = useState(data?.recipe?.likes);
    const router = useRouter();
    const { data: recipe} = usePreviewSubscription(recipeQuery, {
        params: {slug: data.recipe.recipe?.slug.current},
        initialData: data,
        enabled: preview,
     })

    if (router.isFallback){
        return <div>Loading...</div>
    }
   
    
   
     
     const addLike = async () => {
        const res = await fetch("/api/handle-like", {
            method: "POST",
            body: JSON.stringify({ _id: recipe._id }),
        }).catch((error) => console.log(error));

        const data = await res.json();

        setLikes(data.likes);
     };



     return(
    
        <article className="recipe">
  { console.log("recipe",recipe.recipe.name)}
            <h1>{recipe.recipe.name}</h1>
           
           <button className="like-button" onClick={addLike}>
            {likes } ❤️
           </button>

            <main className="content">
                <Image src={urlFor(recipe?.recipe.mainImage).url()} alt={recipe.name} />
                <div className="breakdown">
                    <ul className="ingredients">
                        {recipe.recipe.ingredients?.map((ingredient) => (
                               
                               <li key={ingredient._key} className="ingredient">

                                {ingredient?.wholeNumber}
                                {ingredient?.fraction}
                                {ingredient?.unit}
                                <br />
                                {ingredient?.ingredient?.name}
                               </li>
                               


                        )
                        ) }
                     
                    </ul>
                   <PortableText blocks={recipe?.instructions} className="instructions" />
                </div>
            </main>
        </article>
     )

}

export async function getStaticPaths(){

     const paths = await sanityClient.fetch(

        `*[_type == "recipe" && defined(slug.current)]{
            "params": {
                "slug": slug.current
            }
        }`
     );
   
     return {
        paths,
        fallback: true
     }
}

export async function getStaticProps({ params}){

  const { slug } = params;
  const recipe = await sanityClient.fetch(recipeQuery, { slug })

  return { props:{  data: { recipe }, preview: true } };
}

