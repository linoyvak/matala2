export default interface IComment{
    _id     :string;
    comment :string;
    postId  :string;
    owner   :{
        _id      :string;
        username :string;
    };
}

