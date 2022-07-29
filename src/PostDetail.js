import { useParams } from "react-router-dom";
import { Tags } from 'lucide-react';
import useFetchData from "./hooks/useFetchData";
const { REACT_APP_VIEW_MINI_BLOG_BACKEND_URL, REACT_APP_MANAGE_MINI_BLOG_BACKEND_URL } = process.env;



const PostDetail = () => {
    // Get the path paraam id. 
    const { id } = useParams();

    const { data: post, error, isLoading } = useFetchData(REACT_APP_VIEW_MINI_BLOG_BACKEND_URL+"/" + id);

    return (<div className="d-flex flex-column flex-wrap align-items-center container mt-5">
        {error && <div>{error}</div>}
        {
            isLoading &&
            <div className="text-center mt-5">
                <div className="spinner-border" role="status">
                </div>
                <div>Loading...</div>
            </div>
        }
        {post &&
            <div className="mt-5">
                <div className="row">
                    <div className="col d-flex justify-content-center">
                        <h4 className="fw-semibold">{post.title}</h4>
                    </div>
                </div>
                <div className="card rounded-0 border-0 mt-4">

                    <div className="card-body">
                        <p className="post-body font-medium lh-lg">{post.body}</p>
                    </div>
                    <div className="table-responsive">
                    <table className="table table-bordered">
                    <tbody>
                        <tr>
                            <th scope="row"><Tags size={25} />Tags</th>
                            <td>{
                                    post.tags.map((tag, index) => (
                                        <button className="btn btn-sm btn-outline-secondary rounded-0 text-wrap lh-sm tag-btn m-1" key={index}><a href="#" className="tag-link-text text-secondary">#{tag}</a></button>
                                    ))
                                }</td>
                        </tr>
                        <tr>
                            <th scope="row">Authors</th>
                            <td>{post.authors.join(", ")}</td>
                        </tr>
                    </tbody>
                    </table>
                    </div>
                </div>
            </div>
        }
    </div>);
}

export default PostDetail;