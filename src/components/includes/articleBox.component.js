import { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import CommentBox from './commentBox.component';
import { connect } from "react-redux";
import { articleInputChange, addArticleComment } from '../../redux/actions/articleActions';
import Collapsible from 'react-collapsible';

const Box = props => {	
    const {newArticleReply,articleInputChange,addArticleComment} = props;
    const [modal, setModal] = useState(false);
    const toggle = () => {
       setModal(!modal);
    }
    const commentList = ()=>{
        if (props.article.articlesReplies && props.article.articlesReplies.length>0) {     
            return props.article.articlesReplies.map((item, index) => {
                return (
                <CommentBox comment={item} index={index} articleIndex={props.index}/>          
                );
            });
        } else {
            return <h6>Be the first to comment!</h6>;
        }
    }
    const handleChange = (e)=> {
        const target = e.target;
        const name = target.name;
        const value =  target.value;
        articleInputChange(name, value);
    }
    
    const handleCommentCreation = ()=> {
        const data = {
            userId:'61384ede2fd9bb259c1743cd',
            articleId:props.article.id,
            text:newArticleReply
        }
        addArticleComment(data,props.index)           
    }
	return (
        <>	      
        <div className="col-md-3" onClick={()=>toggle()}>
            <img src={`https://source.unsplash.com/random/200x200?sig=${Math.random() * 6}`} alt="article" className="fullWidth"/> 
            <span>
                    <h5>{props.article? (props.article.title.length >43? props.article.title.substr(0,40)+'...' :props.article.title):'unknown'}</h5>
                    <p>{props.article? (props.article.text.length >100? props.article.text.substr(0,97)+'...' :props.article.text):'unknown'}</p>
                    <p className="readMore"><b>Read More</b></p>
            </span>
        </div>
        <Modal isOpen={modal} toggle={toggle} className="trendingModalClass">
            <ModalHeader toggle={toggle}>{props.article.title}</ModalHeader>
            <ModalBody>  
               {props.article.text}
               <hr/>
               <div className="row">
                    <div className="col-md-12">
                        <h5>{props.article.articlesReplies?props.article.articlesReplies.length:0} Comment(s)</h5>
                    </div>
               </div>
               <div className="row">
                    <div className="col-md-12">
                        <textarea placeholder="Enter Article" rows="5" name="newArticleReply" value={newArticleReply} onChange={handleChange} required>
                            
                        </textarea>           
                    </div>     
               </div>
               <div className="row">
                    <div className="col-md-12">
                        <Button onClick={handleCommentCreation}>Submit Comment</Button>         
                    </div>     
               </div>
               <Collapsible trigger="Click to View Comments">
                {commentList()}
                </Collapsible> 
            </ModalBody>            
            <ModalFooter>
                
            </ModalFooter>   
        </Modal>   
        </>  

    );
};

const mapStateToProps = (state) => ({   
    newArticleReply: state.article.newArticleReply    
});

export default connect(mapStateToProps,{articleInputChange, addArticleComment})(Box);