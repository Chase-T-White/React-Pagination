const Follower = ({ avatar_url, login }) => {
  return (
    <div className='user-card'>
      <img src={avatar_url} alt={login} className='user__img' />
      <h3 className='user__name'>{login}</h3>
      <a href='#' className='btn'>
        View Profile
      </a>
    </div>
  );
};

export default Follower;
