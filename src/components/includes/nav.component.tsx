import React, { useState, ChangeEvent, MouseEvent } from "react";
import Logo from '../../assets/img/logo.jpg';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { connect } from "react-redux";
import { articleInputChange, createArticle } from '../../redux/actions/articleActions';
import PropTypes from 'prop-types';


interface Props{
  newArticle:string,    
  newArticleTitle:string,  
  articleInputChange:(name:string, value:any)=>void, 
  createArticle:(data:object)=>void
}

const MyNav: React.FC<Props> = (props) => {
  const {newArticle, newArticleTitle, articleInputChange, createArticle} = props;
  const [modal, setModal] = useState(false);
  const toggle = () => {
     setModal(!modal);
  }
  const openDialog = (e:MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setModal(true);
  }
  
  const handleChange = (e:ChangeEvent<any>)=> {
    const target = e.target;
    const name = target.name;
    const value =  target.value;
    articleInputChange(name, value);
  }

  const handleArticleCreation = ()=> {
     const data = {
      userId:'61384ede2fd9bb259c1743cd',
      text:newArticle,
      title:newArticleTitle
     }
     createArticle(data)
     toggle()
  }
  
  return (
    <>
   <nav id="myNavigation" className="container-fluid">
     <div className="row">
        <div className="col-md-6">
          <img className="logo" src={Logo} alt="Logo" />
        </div>
        <div className="col-md-6 right">
        <a href="/" onClick={openDialog}>Post Article</a>
        </div>
     </div>
   </nav>
   <Modal isOpen={modal} toggle={toggle} className="trendingModalClass">
        <ModalHeader toggle={toggle}>New Article</ModalHeader>
        <ModalBody>  
          <div className="row">
            <div className="col-md-12">
              <input type="text" placeholder="Enter article title" name="newArticleTitle" value={newArticleTitle} onChange={handleChange} required/>              
            </div>
            <div className="col-md-12">
              <textarea placeholder="Enter Article" rows={7} name="newArticle" value={newArticle} onChange={handleChange} required>
                
              </textarea>           
            </div>           
          </div>
        </ModalBody>            
        <ModalFooter>
          <Button color="primary" onClick={handleArticleCreation}>Create Article</Button>    
        </ModalFooter>   
    </Modal>   
   </>
  );
};

MyNav.propTypes = {
  articleInputChange: PropTypes.func.isRequired,
  createArticle: PropTypes.func.isRequired,
};

const mapStateToProps = (state:any) => ({   
   newArticle: state.article.newArticle,
   newArticleTitle:state.article.newArticleTitle, 
});

export default connect(mapStateToProps,{articleInputChange, createArticle})(MyNav);

