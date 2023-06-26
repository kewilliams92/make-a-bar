import { Component } from "solid-js";
import { FaSolidCandyCane } from "solid-icons/fa";

type Props = {
    size: number;
}

const Loader: Component<Props> = (props) => {
    return (
        <div class="flex-it text-white justify-center items-center h-full">
            <div class="rotating">
                <FaSolidCandyCane size={props.size} />
            </div>
        </div>
    )
}

export default Loader