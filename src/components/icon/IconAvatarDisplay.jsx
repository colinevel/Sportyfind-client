import React from "react";


export default function IconAvatar({ clbk, avatar= ""}) {
  const fileInput = React.createRef();


  return (
    <div className={"is-clickable icon-avatar"} title="change avatar">
      {avatar && <img src={avatar} alt="user avatar" />}
      <input
        ref={fileInput}
        type="file"
        className="is-hidden"
        onChange={clbk}
      />
    </div>
  );
}
