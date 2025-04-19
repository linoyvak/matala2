export default interface IComment{
    _id     :string;
    comment :string;
    postId  :string;
    __v     :number;
    owner   :{
        _id      :string;
        username :string;
    };
}