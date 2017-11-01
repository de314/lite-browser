import React from 'react'

import FloatingContentWrapper from 'components/layout/FloatingContentWrapper'

const Page404 = () => (
  <div className="Page404">
    <FloatingContentWrapper>
      <div className="text-center">
        <h1>Looking for something?</h1>
        <p className="lead text-muted mv-6">It's not here.</p>
        <p className="text-muted">Maybe try again later... :(</p>
      </div>
    </FloatingContentWrapper>
  </div>
)

export default Page404
