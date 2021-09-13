import React, { useState, ChangeEvent, MouseEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  
  faEdit, faTrash
} from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { connect } from "react-redux";
import { articleInputChange, updateComment, getArticles,deleteArticleComment } from '../../redux/actions/articleActions';

interface Props{
    commentUpdateText:string,
    articleIndex:number,
    index:number,
    comment:{
       text:string,
       id:string,
       userId:{
           fullName:string
       }
    },
    articleInputChange:(name:any, value:any)=>void, 
    updateComment:(data:object,commentId:string,articleIndex:number, index:number)=>void, 
    getArticles:()=>void, 
    deleteArticleComment:(commentId:string)=>void, 
}

const Box: React.FC<Props> = ({articleInputChange,updateComment,commentUpdateText,getArticles,deleteArticleComment,comment, articleIndex, index}) => {
  
    const [modal, setModal] = useState(false);
    const [modal2, setModal2] = useState(false);
    const toggle = () => {
       setModal(!modal);
    }
    const toggle2 = () => {
        setModal2(!modal2);
    }

    const handleUpdateBox = (e:MouseEvent<HTMLAnchorElement>):void => {
        e.preventDefault()
        articleInputChange('commentUpdateText', comment.text);
        setModal(true);
    }

    const handleDeleteBox = (e:MouseEvent<HTMLAnchorElement>)=> {
        e.preventDefault()
         toggle2()            
    }

    const handleChange = (e:ChangeEvent<HTMLTextAreaElement>)=> {
        const target = e.target;
        const name = target.name;
        const value =  target.value;
        articleInputChange(name, value);
    }
    
    const handleCommentUpdate = async()=> {
        const data = {           
            text:commentUpdateText
        }
        await updateComment(data,comment.id,articleIndex, index)     
        getArticles() 
        setModal(false);                
    }    

    const handleCommentDelete = async()=> {
        await deleteArticleComment(comment.id)  
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
                <b>{comment.userId.fullName}</b>
            </div>
        </div>
        <div className="row">
            <div className="col-md-1"> </div>
            <div className="col-md-8">
                {comment.text}
            </div>
        </div>
        <div className="row controlSection">
            <div className="col-md-1"> </div>
            <div className="col-md-5">
                <a href="/" onClick={handleUpdateBox}><FontAwesomeIcon icon={faEdit} color="cornflowerblue"/>&nbsp;Edit</a>&nbsp;&nbsp;&nbsp;<a  href="/" onClick={handleDeleteBox}><FontAwesomeIcon icon={faTrash} color="cornflowerblue"/>&nbsp;Delete</a>
            </div>            
        </div>  
        <Modal isOpen={modal} toggle={toggle} className="trendingModalClass">
            <ModalHeader toggle={toggle}>Edit Comment</ModalHeader>
            <ModalBody>               
               <div className="row">
                    <div className="col-md-12">
                        <textarea placeholder="Enter Article" rows={5} name="commentUpdateText"   value={commentUpdateText} required onChange={handleChange}>
                            
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
const mapStateToProps = (state:any) => ({   
    commentUpdateText:  state.article.commentUpdateText  
});

export default connect(mapStateToProps,{articleInputChange, updateComment, getArticles, deleteArticleComment})(Box);