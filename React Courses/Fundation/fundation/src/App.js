import React, {useEffect, useState} from "react";
import './styles/app.css'
import PostList from "./Components/PostList";
import PostForm from "./Components/PostForm";
import PostFilter from "./Components/PostFilter";
import MyModal from "./Components/UI/MyModal/MyModal";
import MyButton from "./Components/UI/button/MyButton";
import {usePosts} from "./hooks/usePosts";
import PostService from "./API/PostService";
import Loader from "./Components/UI/Loader/Loader";
import {useFetching} from "./hooks/useFetching";
import {getPagesArray, getPagesCount} from "./utils/pages";
import Pagination from "./Components/UI/pagination/Pagination";
function App() {
    const [posts,setPosts] = useState([])
    const [filter,setFilter] = useState({sort:'', query:''})
    const [modal,setModal] = useState(false);
    const [totalPage,setTotalPages] = useState(0);
    const [limit,setLimit] = useState(10);
    const [page,setPage] = useState(1);
    const sortedAndSearchedPosts = usePosts(posts,filter.sort,filter.query)

    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit,page)=> {
        const response = await PostService.getAll(limit,page);
        setPosts(response.data)
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPagesCount(totalCount,limit));
    })


    useEffect(()=>{
        fetchPosts(limit,page);
    }, [])

    const createPost=(newPost)=>{
        setPosts([...posts,newPost])
        setModal(false)
    }




    const removePost = (post)=>{
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const changePage = (page) =>{
        setPage(page);
        fetchPosts(limit,page)
    }



  return (
    <div className="App">
        <button onClick={fetchPosts}>GET POSTS</button>
        <MyButton style = {{marginTop:30}} onClick={()=> setModal(true)}>
            Создать пост
        </MyButton>
        <MyModal visible={modal} setVisible={setModal}>
            <PostForm create={createPost}/>
        </MyModal>
        <hr style={{margin:'15px 0'}}/>
      <PostFilter filter={filter} setFilter={setFilter}/>
        {postError &&
            <h1>Произошла ошибка </h1>
        }
        {isPostsLoading
            ? <div style={{display:'flex',justifyContent: 'center',marginTop:'50px'}}><Loader/></div>
            : <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список постов 1"/>
        }
        <Pagination
            page={page}
            changePage={changePage}
            totalPage={totalPage}/>
    </div>
  );
}

export default App;
