import { useNavigate } from 'react-router-dom';

export const withRouter = (Component:React.ComponentClass<any , any>) => {
  const Wrapper = (props : any) => {
    const navigate = useNavigate();
    
    return (
      <Component
        navigate={navigate}
        {...props}
        />
    );
  };
  
  return Wrapper;
};