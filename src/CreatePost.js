import { Highlighter, Tags, Newspaper, Users, Trash2 } from 'lucide-react';
import { Toast, ToastContainer } from 'react-bootstrap'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
const { REACT_APP_MANAGE_MINI_BLOG_BACKEND_URL } = process.env;

const CreatePost = () => {
    // Declared variables.
    const postMaxLength = 1000;
    const toastTimeoutInMillis = 3000;
    const toastPosition = 'bottom-end';
    const history = useHistory();
    const defaultTagFormFields = [{ tag: '' }];
    const defaultAuthorFormFields = [{ name: '' }];
    const defaultShowToast = { value: "", show: false };

    // States
    const [tagFormFields, setTagFormFields] = useState(defaultTagFormFields);
    const [authorFormFields, setAuthorFormFields] = useState(defaultAuthorFormFields);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [showToast, setToast] = useState(defaultShowToast);


    // Functions 
    // Functions to handle tags.
    const handleTagFormChange = (e, index) => {
        let data = [...tagFormFields];
        data[index][e.target.name] = e.target.value;
        console.log(`Tag value change ${e.target.value} at ${index}`);
        setTagFormFields(data);
    };

    const addTag = () => {
        let newTag = { tag: '' };
        console.log(`adding new tag`);
        setTagFormFields([...tagFormFields, newTag]);
    };

    const deleteTag = (index) => {
        let data = [...tagFormFields];
        data.splice(index, 1);
        console.log(`deleting the tag at ${index}`);
        setTagFormFields(data);
    };

    // Functions to handle authors
    const handleAuthorFormChange = (e, index) => {
        let data = [...authorFormFields];
        data[index][e.target.name] = e.target.value;
        console.log(`Author value change ${e.target.value} at ${index}`);
        setAuthorFormFields(data);
    };

    const addAuthor = () => {
        let newAuthor = { name: '' };
        console.log(`adding new author`);
        setAuthorFormFields([...authorFormFields, newAuthor]);
    };

    const deleteAuthor = (index) => {
        let data = [...authorFormFields];
        data.splice(index, 1);
        console.log(`deleting the author at ${index}`);
        setAuthorFormFields(data);
    };

    const handleSubmit = (e) => {
        console.log(`URL - ${REACT_APP_MANAGE_MINI_BLOG_BACKEND_URL}`);
        e.preventDefault();
        console.log(`Submit pressed, values - ${title}, ${body}, ${JSON.stringify(tagFormFields)}, ${JSON.stringify(authorFormFields)}`);
        let tags = tagFormFields.map((tag, index) => tag.tag);
        let authors = authorFormFields.map(authr => authr.name);
        const newPost = { title, body, tags, authors };
        console.log(newPost);
        // make the post request
        fetch(REACT_APP_MANAGE_MINI_BLOG_BACKEND_URL, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPost)
        }).then(() => {
            // Set toast to true to show the message. 
            setToast({ value: title, show: true });
            console.log("added new post");
            // Reset the state / form values
            setTitle("");
            setBody("");
            setAuthorFormFields(defaultAuthorFormFields);
            setTagFormFields(defaultTagFormFields);
            // Allow toast to display message before redirect. 
            setTimeout(() => {
                history.push('/');
            }, toastTimeoutInMillis + 5);
            // create a tost with post title. 
        });
    }

    return (
        <div className="d-flex flex-column flex-wrap align-items-center container mt-5">
            <ToastContainer className="p-3" position={toastPosition}>
                <Toast
                    onClose={() => setToast(false)}
                    autohide
                    bg='info'
                    show={showToast.show}
                    delay={toastTimeoutInMillis}
                >
                    <Toast.Body>
                        <strong className="mr-auto">{showToast.value} successfully posted! </strong>
                    </Toast.Body>
                </Toast>
            </ToastContainer>
            <div className="row w-100">
                <div className="col d-flex justify-content-start w-100">
                    <h5 className="fw-semibold">Create new Post</h5>
                </div>
            </div>
            <hr className='w-100' />
            <form className="container mb-5" onSubmit={handleSubmit}>
                {/* Title */}
                <div className="row mt-4">
                    <div className="col ps-0 pe-0">
                        <label className="form-label fw-semibold"><Highlighter className="m-1" />Post Title</label>
                        <input
                            type="text"
                            name="title"
                            className="form-control form-control-sm rounded-0"
                            placeholder="Title of your post"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                            minLength={8}>
                        </input>
                    </div>
                </div>
                {/* Content */}
                <div className="row mt-4">
                    <div className="col ps-0 pe-0">
                        <label className="form-label fw-semibold"><Newspaper className="m-1" />Content</label>
                        <textarea
                            name="content"
                            className="form-control form-control-sm rounded-0"
                            placeholder="Type your post here, maximum 1000 letters allowed."
                            minLength={200}
                            maxLength={postMaxLength}
                            rows="10"
                            required
                            value={body}
                            onChange={e => setBody(e.target.value)}
                        >
                        </textarea>
                        <p className="form-text">Remaining {postMaxLength - body.length}</p>
                    </div>
                </div>
                {/* TAGS and AUTHORS */}
                <h6>Other Information</h6>
                <div className="row mt-3 border d-flex flex-row flex-wrap">
                    <div className="col col-sm d-flex flex-column flex-wrap mt-3 mb-2">
                        <label className="form-label fw-semibold"><Tags className="m-1" />Tags</label>
                        <div className="table-responsive">
                            <table className="table table-borderless">
                                <tbody>
                                    {tagFormFields.map((tagForm, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <input type="text"
                                                        name="tag"
                                                        className="form-control form-control-sm rounded-0"
                                                        placeholder="Tag"
                                                        value={tagForm.tag}
                                                        onChange={e => handleTagFormChange(e, index)}
                                                        required
                                                        minLength={3}
                                                        maxLength={20}>
                                                    </input>
                                                </td>
                                                <td>
                                                    {(index === tagFormFields.length - 1) && <button type="button" className="btn btn-sm btn-outline-secondary ps-2 pe-2" onClick={addTag}><strong>+</strong></button>}
                                                    {(index !== tagFormFields.length - 1) && <button type="button" className="btn btn-sm btn-outline-secondary ps-1 pe-1" onClick={() => deleteTag(index)}><strong><Trash2 size={17}></Trash2></strong></button>}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col col-sm d-flex flex-column flex-wrap mt-3 mb-2">
                        <label className="form-label fw-semibold"><Users className="m-1" />Authors</label>
                        <div className="table-responsive">
                            <table className="table table-borderless">
                                <tbody>
                                    {
                                        authorFormFields.map((author, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        <input type="text"
                                                            name="name"
                                                            className="form-control form-control-sm rounded-0"
                                                            placeholder="Author"
                                                            value={author.name}
                                                            onChange={e => handleAuthorFormChange(e, index)}
                                                            required
                                                            minLength={4}
                                                            maxLength={40}
                                                        >
                                                        </input>
                                                    </td>
                                                    <td>
                                                        {(index === authorFormFields.length - 1) && <button type="button" className="btn btn-sm btn-outline-secondary ps-2 pe-2" onClick={addAuthor}><strong>+</strong></button>}
                                                        {(index !== authorFormFields.length - 1) && <button type="button" className="btn btn-sm btn-outline-secondary ps-1 pe-1" onClick={() => deleteAuthor(index)}><strong><Trash2 size={17}></Trash2></strong></button>}
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {/* Submit button */}
                <div className="row mt-5">
                    <div className="col d-flex justify-content-end">
                        <button type="submit" className="btn btn-sm btn-outline-info rounded-0 text-black-50 fw-semibold">Create Post</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CreatePost;