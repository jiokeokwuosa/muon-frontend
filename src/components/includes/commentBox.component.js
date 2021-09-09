import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  
  faEdit, faTrash
} from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { connect } from "react-redux";
import { articleInputChange, updateComment, getArticles,deleteArticleComment } from '../../redux/actions/articleActions';

const Box = props => { 
    const {articleInputChange,updateComment,commentUpdateText,getArticles,deleteArticleComment} = props;   
    const [modal, setModal] = useState(false);
    const [modal2, setModal2] = useState(false);
    const toggle = () => {
       setModal(!modal);
    }
    const toggle2 = () => {
        setModal2(!modal2);
    }

    const handleUpdateBox = (e) => {
        e.preventDefault()
        articleInputChange('commentUpdateText', props.comment.text);
        setModal(true);
    }
    const handleChange = (e)=> {
        const target = e.target;
        const name = target.name;
        const value =  target.value;
        articleInputChange(name, value);
    }
    
    const handleCommentUpdate = async()=> {
        const data = {           
            text:commentUpdateText
        }
        await updateComment(data,props.comment.id,props.articleIndex, props.index)     
        getArticles() 
        setModal(false);                
    }

    const handleDeleteBBox = (e)=> {
        e.preventDefault()
         toggle2()            
    }

    const handleCommentDelete = async()=> {
        await deleteArticleComment(props.comment.id)  
        getArticles() 
        setModal2(false);          
    }
    
	return (
        <>	      
        <div className="row">
            <div className="col-md-1">
                <img src={`https://source.unsplash.com/random/200x200?sig=${()=>Math.random() * 6}`} alt="comment" className="fullWidth"/> 
            </div>
            <div className="col-md-5">
                <b>{props.comment.userId.fullName}</b>
            </div>
        </div>
        <div className="row">
            <div className="col-md-1"> </div>
            <div className="col-md-8">
                {props.comment.text}
            </div>
        </div>
        <div className="row controlSection">
            <div className="col-md-1"> </div>
            <div className="col-md-5">
                <a href="/" onClick={handleUpdateBox}><FontAwesomeIcon icon={faEdit} color="cornflowerblue"/>&nbsp;Edit</a>&nbsp;&nbsp;&nbsp;<a  href="/" onClick={handleDeleteBBox}><FontAwesomeIcon icon={faTrash} color="cornflowerblue"/>&nbsp;Delete</a>
            </div>            
        </div>  
        <Modal isOpen={modal} toggle={toggle} className="trendingModalClass">
            <ModalHeader toggle={toggle}>Edit Comment</ModalHeader>
            <ModalBody>               
               <div className="row">
                    <div className="col-md-12">
                        <textarea placeholder="Enter Article" rows="5" name="commentUpdateText"   value={commentUpdateText} required onChange={handleChange}>
                            
                        </textarea>           
                    </div>     
               </div>
               <div className="row">
                    <div className="col-md-12">
                        <Button onClick={handleCommentUpdate}>Update Comment</Button>         
                    </div>     
               </div>              
            </ModalBody>            
            <ModalFooter>
                
            </ModalFooter>   
        </Modal>  
        <Modal isOpen={modal2} toggle={toggle2} className="trendingModalClass">
            <ModalHeader toggle={toggle2}>Delete Comment</ModalHeader>
            <ModalBody>               
               <div className="row">
                    <div className="col-md-12 push2">
                        <h2 className="center">Sure you want to do this?</h2>
                    </div>
               </div>
               <div className="row">
                    <div className="col-md-12 center">
                        <Button onClick={handleCommentDelete} className="center">Yes, Delete</Button>         
                    </div>     
               </div>              
            </ModalBody>            
            <ModalFooter>
                
            </ModalFooter>   
        </Modal>                
        </>
     );
};
const mapStateToProps = (state) => ({   
    commentUpdateText:  state.article.commentUpdateText  
});

export default connect(mapStateToProps,{articleInputChange, updateComment, getArticles, deleteArticleComment})(Box);