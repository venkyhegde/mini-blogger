import { useState } from "react";
import PostsList from "./PostsListV3";
import useFetchData from "./hooks/useFetchData";
// import $ from 'jquery';
import { Toast, ToastContainer } from 'react-bootstrap'
const { REACT_APP_VIEW_MINI_BLOG_BACKEND_URL, REACT_APP_MANAGE_MINI_BLOG_BACKEND_URL, TEST } = process.env;

const Home = () => {
    // Get posts URL
    const defaultShowToast = { value: "", show: false };
    const toastTimeoutInMillis = 3000;
    const toastPosition = 'bottom-end';

    const [showToast, setToast] = useState(defaultShowToast);
    const { data: posts, isLoading, error } = useFetchData(REACT_APP_VIEW_MINI_BLOG_BACKEND_URL);
    const [filterString, setFilterString] = useState("");

    /**
     * funtion to handle the changes in posts filer.
     * @param {string} filterStr 
     */
    const handleFilter = (filterStr) => {
        console.log(`TEST - ${TEST} ${REACT_APP_VIEW_MINI_BLOG_BACKEND_URL}`);
        setFilterString(filterStr);
    };

    const handleDelete = (postId) => {
        console.log(`deleting the post ${postId}, URL - ${REACT_APP_MANAGE_MINI_BLOG_BACKEND_URL}`);
        fetch(REACT_APP_MANAGE_MINI_BLOG_BACKEND_URL + '/' + postId, {
            method: 'DELETE'
        }).then(() => {
            console.log(`deleted ${postId}`);
        });
    };

    const handleDeleteWithTitle = (postId, postTitle) => {
        handleDelete(postId);
        setToast({ value: postTitle, show: true });
        setTimeout(() => {
            setToast(defaultShowToast);
        }, toastTimeoutInMillis);
    }

    /**
     * 
     * @param {[string]} tags 
     * @returns true if tag contains the filter text, else false. 
     */
    const isTagContains = (tags) => {
        return tags.filter(t => t.toLowerCase().includes(filterString.toLowerCase())).length > 0;
    };

    /**
     * 
     * @param {} post 
     * @returns true if title contains the filter text, else false. 
     */
    const isTitleContains = (post) => {
        return post.title.toLowerCase().includes(filterString.toLowerCase())
    }

    return (
        <div className="d-flex flex-wrap align-items-center flex-column">
            {
                <div className="text-center">
                    <ToastContainer className="p-3" position={toastPosition}>
                        <Toast
                            onClose={() => setToast(false)}
                            autohide
                            bg='warning'
                            show={showToast.show}
                            delay={toastTimeoutInMillis}
                        >
                            <Toast.Body>
                                <strong className="mr-auto">{showToast.value} successfully deleted! </strong>
                            </Toast.Body>
                        </Toast>
                    </ToastContainer>
                </div>

            }
            {error && <div>{error}</div>}
            {isLoading &&
                <div className="text-center mt-5">
                    <div className="spinner-border" role="status">
                    </div>
                    <div>Loading...</div>
                </div>
            }
            {posts && <PostsList posts={filterString.length < 2 ? posts : posts.filter(p => isTitleContains(p) || isTagContains(p.tags))} handleFilter={handleFilter} handleDelete={handleDeleteWithTitle} title="All Posts" filterString={filterString} />}
        </div>
    );
}

export default Home;