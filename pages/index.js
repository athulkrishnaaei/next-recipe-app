import Head from 'next/head'
import Link from 'next/link'
import { sanityClient,urlFor } from '../lib/sanity'

const recipeQuery = `*[_type == "recipe"]{
  _id,
  name,
  slug,
  mainImage
}`;

export default function Home({ recipes}) {
 
  return (
    <div >
      <Head>
        <title>Athul's Kitchen</title>
        <meta name="description" content="Create Next App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <h1>Welcome to Athul's Kitchen</h1>

        <ul className="recipes-list">

          {recipes?.length >0 && recipes.map(recipe => (

          <li key={recipe._id} className="recipe-card">

            <Link href={`/recipes/${recipe.slug.current}`}>

            <a>
          
              <img  src={urlFor(recipe.mainImage).url()} alt={recipe.name}/>

              <span>{recipe.name}</span>

            </a>

            </Link>

          </li>

          ))}

        </ul>

    </div>
        
          
  );
}

export async function getStaticProps () {

  const recipes =  await  sanityClient.fetch(recipeQuery);

   return { props: { recipes } };
}