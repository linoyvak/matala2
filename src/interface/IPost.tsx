export default interface IPost{
    _id     :string,
    title   :string,
    content :string,
    likes   :any[],
    owner   :{
        _id      :string
        username :string,
    }
}


