import '../styles/globals.css'
import Link from "next/link"

function MyApp({ Component, pageProps }) {

  return (

    <>  
    <nav>
    
      <div className='header'>

        <Link href ="/about">
          <a>Athul's Kitchen</a>
        
        </Link>
      </div>

    </nav>
     
       <main>

        <Component{...pageProps}/>

        </main> 
    </>
  );
}

export default MyApp
