
export function Input(props: React.ComponentPropsWithoutRef<"input">){
    const type = props.type || "text";

    return (
        <input {...props} type={type} className="border border-gray-800 dark:text-gray-800 px-4 py-2 rounded"/>
    )
}
