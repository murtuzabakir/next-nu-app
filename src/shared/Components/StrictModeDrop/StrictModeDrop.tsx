import { useEffect, useState } from "react";
import { Droppable, DroppableProvided, DroppableStateSnapshot, DroppableProps } from "react-beautiful-dnd";

interface StrictModeDroppableProps extends DroppableProps {
    children: (provided: DroppableProvided, snapshot: DroppableStateSnapshot) => React.ReactElement;
}

const StrictModeDrop: React.FC<StrictModeDroppableProps> = ({ children, ...props }) => {
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        const animation = requestAnimationFrame(() => setEnabled(true));
        return () => cancelAnimationFrame(animation);
    }, []);

    if (!enabled) {
        return null;
    }

    return <Droppable {...props}>{children}</Droppable>;
};

export default StrictModeDrop;
