import React, {useEffect, useRef} from 'react';
import Navigation from './../../includes/nav.component';
import ArticleBox from '../../includes/articleBox.component';
import './styles.css';
import { connect } from "react-redux";
import { getArticles } from '../../../redux/actions/articleActions';
import PropTypes from "prop-types";


interface Props{
  articles:[{
    text:string,
    title:string,
    userId:object
  }], 
  getArticles:()=>void 
}


const Homepage: React.FC<Props> =({articles, getArticles})=> { 
  const mounted = useRef<boolean>(false); 

  useEffect(() => {
    if (!mounted.current || !articles.length) {      
      mounted.current = true;
      getArticles()    
    }    
  });
 

  const articleList = () => {
    if (articles && articles.length>0) {     
      return articles.map((item:any, index:number) => {
        return (
          <ArticleBox article={item} index={index}/>          
        );
      });
    } else {
      return <h6>No article yet</h6>;
    }
  };
  return (  
    <>
      <Navigation/>
      <div id="HomepageFirstSection">  </div>
      <div id="HomepageSecondSection" className="container-fluid">
          <div className="row">
              <div className="col-md-12">
                  <h1>MUON Club</h1>
                  <p>Muon Club is a digital platform and exclusive community where outstanding ideas meet capital...</p>
              </div>                
          </div>
      </div>
      <div id="HomepageThirdSection" className="container-fluid">
          <div className="row">
              {articleList()}     
          </div>
      </div>
    </>
  );
}

Homepage.propTypes = {
  getArticles: PropTypes.func.isRequired,
};

const mapStateToProps = (state:any) => ({   
   articles: state.article.articles 
});

export default connect(mapStateToProps, {
  getArticles
})(Homepage);
