import React, { useState, ChangeEvent } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import CommentBox from './commentBox.component';
import { connect } from "react-redux";
import { articleInputChange, addArticleComment } from '../../redux/actions/articleActions';
import Collapsible from 'react-collapsible';

interface Props{
    newArticleReply:string,    
    index:number, 
    article:{
        id:string,
        title:string,
        text:string,
        articlesReplies:[{
            
        }]
        userId:string
    },
    articleInputChange:(name:string, value:any)=>void, 
    addArticleComment:(data:{
        userId:string,
        articleId:string,
        text:string
    },index:number)=>void    
}

const Box: React.FC<Props> = ({newArticleReply,articleInputChange,addArticleComment, article, index}) => {	
    const [modal, setModal] = useState(false);
    const toggle = () => {
       setModal(!modal);
    }
    const commentList = ()=>{
        if (article.articlesReplies && article.articlesReplies.length>0) {     
            return article.articlesReplies.map((item:any, index) => {
                return (
                <CommentBox comment={item} index={index} articleIndex={index}/>          
                );
            });
        } else {
            return <h6>Be the first to comment!</h6>;
        }
    }
    const handleChange = (e:ChangeEvent<HTMLTextAreaElement>):void=> {
        const target = e.target;
        const name = target.name;
        const value =  target.value;
        articleInputChange(name, value);
    }
    
    const handleCommentCreation = ()=> {
        const data = {
            userId:'61384ede2fd9bb259c1743cd',
            articleId:article.id,
            text:newArticleReply
        }
        addArticleComment(data,index)           
    }
	return (
        <>	      
        <div className="col-md-3" onClick={()=>toggle()}>
            <img src={`https://source.unsplash.com/random/200x200?sig=${Math.random() * 6}`} alt="article" className="fullWidth"/> 
            <span>
                    <h5>{article? (article.title.length >43? article.title.substr(0,40)+'...' :article.title):'unknown'}</h5>
                    <p>{article? (article.text.length >100? article.text.substr(0,97)+'...' :article.text):'unknown'}</p>
                    <p className="readMore"><b>Read More</b></p>
            </span>
        </div>
        <Modal isOpen={modal} toggle={toggle} className="trendingModalClass">
            <ModalHeader toggle={toggle}>{article.title}</ModalHeader>
            <ModalBody>  
               {article.text}
               <hr/>
               <div className="row">
                    <div className="col-md-12">
                        <h5>{article.articlesReplies?article.articlesReplies.length:0} Comment(s)</h5>
                    </div>
               </div>
               <div className="row">
                    <div className="col-md-12">
                        <textarea placeholder="Enter Article" rows={5} name="newArticleReply" value={newArticleReply} onChange={handleChange} required>
                            
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

const mapStateToProps = (state:any) => ({   
    newArticleReply: state.article.newArticleReply    
});

export default connect(mapStateToProps,{articleInputChange, addArticleComment})(Box);