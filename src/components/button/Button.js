import React from "react";

const Button = ({
   onClick,
   className = "",
   children,
   full = false,
   type = "button",
   btnType = "secondary",
   ...props
}) => {
   let bgColor = "bg-primary";
   switch (btnType) {
      case "primary": {
         bgColor = "bg-primary";
         break;
      }
      case "secondary": {
         bgColor = "bg-secondary";
         break;
      }
      default:
         break;
   }
   return (
      <button
         type={type}
         onClick={onClick}
         className={`bg-primary text-white text-xl text-center font-bold capitalize px-6 py-4 rounded-lg mt-auto ${className} ${bgColor} ${
            full ? "w-full" : ""
         }`}
         {...props}
      >
         {children}
      </button>
   );
};

export default Button;
