import { GiBearFace } from "react-icons/gi";

function AuthHeader({ title }) {
  return (
    <div className="authHeader">
      <div className="authIcon">
        <GiBearFace size={80} />
      </div>
      <h1 className="title authTitle">{title}</h1>
    </div>
  );
}

export default AuthHeader;
