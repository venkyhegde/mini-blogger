import { useState } from "react";
import { Filter, MoreHorizontal, Trash2, Tags, Users } from "lucide-react";
const { REACT_APP_VIEW_MINI_BLOG_BACKEND_URL, REACT_APP_MANAGE_MINI_BLOG_BACKEND_URL } = process.env;

const PostsList = ({ posts, handleFilter, title, filterString, handleDelete }) => {
    const defaultGetPostResponse = { post: null, ok: false };

    const [getPostResponse, setGetPostResponse] = useState(defaultGetPostResponse);
    const [isPostLoading, setIsPostLoading] = useState(true);

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    };

    const handleTitleClick = (id) => {
        console.log(`getting details for the post ${id}`);
        // Get post
        setTimeout(() => {
            fetch(REACT_APP_VIEW_MINI_BLOG_BACKEND_URL + "/" + id).then(res => {
                if (!res.ok) {
                    throw Error("[ERROR] " + res.url + " " + res.status + " " + res.statusText);
                }
                return res.json();
            }).then(data => {
                let getPostRes = {
                    post: data,
                    ok: true
                }
                setGetPostResponse(getPostRes);
                setIsPostLoading(false);
            }).catch(err => {
                let getPostRes = {
                    post: null,
                    ok: false
                }
                setGetPostResponse(getPostRes);
                setIsPostLoading(false);
            });
        }, 500);
    };

    const handleModalClose = () => {
        // set the get post response and isPostLoading to default value
        setGetPostResponse(defaultGetPostResponse);
        setIsPostLoading(true);
    }

    return (
        <div className="d-flex flex-column align-items-start container mt-5">
            <div className="w-100"><h5 className="fw-semibold">{title}</h5>
                <hr className='w-100' />
            </div>

            {/* todo: this filter can be a separate component. */}
            <div className="input-group input-group-sm mb-3 w-80">
                <span className="input-group-text rounded-0" id="posts-filter-id"><Filter width={20} height={20} />Filter Posts</span>
                <input type="text" value={filterString} onChange={(e) => handleFilter(e.target.value)} className="form-control rounded-0" aria-describedby="posts-filter-id" placeholder="Search for Title or Tag..." />
            </div>

            {/* Post list */}
            <div className="d-flex flex-wrap align-items-start flex-column mb-4 w-80">
                {
                    posts.map((p, i) => (
                        <div className="d-flex flex-wrap align-items-start flex-column p-3 mb-1 mt-1 card post-preview-card rounded-0 w-100" key={i}>
                            <div className="text-wrap flex-fill">
                                <a className="post-title" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => handleTitleClick(p.id)}><h6>{p.title}</h6></a>
                                <p className="card-subtitle mb-1 text-muted font-smaller">{truncate(p.body, 150)}</p>
                            </div>
                            <div className="d-inline-flex table-hover">
                                {
                                    p.tags.map((tag, index) => (
                                        <button className="btn btn-sm btn-outline-secondary rounded-0 text-wrap lh-sm tag-btn m-1" key={index}><a className="tag-link-text text-secondary">#{tag}</a></button>
                                    ))
                                }
                            </div>

                            {/* MODAL  todo: this can be a component*/}
                            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div className="modal-dialog modal-sm modal-xl modal-lg">
                                    <div className="modal-content rounded-0">
                                        <div className="border border-dark border-opacity-50 m-1">
                                            {
                                                isPostLoading &&
                                                <div className="text-center mt-5">
                                                    <div className="spinner-border" role="status">
                                                    </div>
                                                    <div>Loading...</div>
                                                </div>
                                            }
                                            {
                                                (!isPostLoading && getPostResponse.ok) &&
                                                <>
                                                    <div className="modal-header border-0">
                                                        <div className="border border-primary border-opacity-25 w-100 p-1 bg-info bg-opacity-25">
                                                            <h5 className="modal-title ms-2" id="staticBackdropLabel">{getPostResponse.post.title}</h5>
                                                        </div>
                                                    </div>
                                                    <div className="modal-body post-body">
                                                        <div className="">
                                                            <main>
                                                                <aside className="border border-secondary border-opacity-25 bg-light bg-opacity-50">
                                                                    <div className="table-responsive">
                                                                        <table className="table table-borderless w-100">
                                                                            <tbody>
                                                                                <tr className="bg-success bg-opacity-50">
                                                                                    <td className="font-md p-0 text-center bold-font"><Users size={20}
                                                                                        strokeWidth={3}></Users> Authors</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td className="font-md p-0 text-start p-1">
                                                                                        <ul>{getPostResponse.post.authors.map(name => <li key={name}> {name} </li>)}</ul>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr className="bg-success bg-opacity-50">
                                                                                    <td className="font-md p-0 text-center bold-font"><Tags size={20}
                                                                                        strokeWidth={3}></Tags> Tags</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td
                                                                                        className="font-md p-0 text-start p-1">
                                                                                        <div>
                                                                                            {
                                                                                                getPostResponse.post.tags.map((tag, index) => (
                                                                                                    <button className="btn btn-sm  rounded-0 text-wrap lh-sm tag-btn m-1" key={index}><a href="#" className=" text-secondary font-md">#{tag}</a></button>
                                                                                                ))
                                                                                            }
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </aside>
                                                                <article className="text-sm-start lh-lg">
                                                                    {getPostResponse.post.body}
                                                                </article>
                                                            </main>
                                                            <hr />
                                                        </div>
                                                        <div className="d-flex">
                                                            <div className="w-100 ps-3">
                                                                <div className="btn-group">
                                                                    <button className="btn btn-white btn-sm dropdown-toggle pe-0 ps-1 rounded-0" type="button" data-bs-toggle="dropdown"
                                                                        aria-expanded="false">
                                                                        <MoreHorizontal></MoreHorizontal>
                                                                    </button>
                                                                    <ul className="dropdown-menu">
                                                                        <li>
                                                                            <button type="button" className="btn btn-sm btn-danger w-100 bg-opacity-25" data-bs-dismiss="modal" onClick={() => handleDelete(getPostResponse.post.id, getPostResponse.post.title)}><Trash2 size={25} strokeWidth={2} className="pb-1"></Trash2><span className="ms-1"><strong>Delete this Post</strong></span></button>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className="flex-shrink-1">
                                                                <button type="button" className="btn btn-sm btn-outline-secondary rounded-0" data-bs-dismiss="modal" onClick={handleModalClose}>Close</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            }
                                            {
                                                (!isPostLoading && !getPostResponse.ok) &&
                                                <div className="modal-header">
                                                    <h6 className="modal-title" id="staticBackdropLabel">Failed to get the post! try later. </h6>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
export default PostsList;