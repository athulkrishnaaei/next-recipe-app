import React from 'react'
import Link from 'next/link';
const Welcome  = () => {
  return (
<>
  <h1>First Post</h1>
    <h2>
      <Link href="/">
        Back to home
      </Link>
    </h2>
</>
  );
}

export default Welcome 