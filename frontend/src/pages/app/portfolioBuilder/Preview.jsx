import React from 'react'
import "./preview.css"
import Darktheme from '../../../templates/portfolio/Darktheme'
import { useSearchParams } from 'react-router-dom'
import { Portfolioregistry } from './Portfolioregistry'

const Preview = () => {

    const [searchParams] = useSearchParams()
    const template = searchParams.get('template')
    const Selectedportfolio = Portfolioregistry[template]

    

  return (
    <div className='main'>
        <div className='preview-header'>
            <h1>Template Preview</h1>
        </div>
        
        {/* The key is this wrapper */}
        <div className='template-wrapper'>
            {Selectedportfolio ? (<Selectedportfolio />) : (<div>Template not found</div>)}
        </div>
    </div>
  )
}

export default Preview