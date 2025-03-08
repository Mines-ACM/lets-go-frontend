import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Button, Dialog, FAB, IconButton, Portal, Text } from "react-native-paper";

export default function ShareButton() {
    let [open, setOpen] = useState(false);

    let onStateChange = ({open}: {open: boolean}) => setOpen(open);

    return (
        <>
            <Portal>
                <FAB.Group
                    open={open}
                    visible
                    icon='plus'
                    label='Create'
                    style={{marginBottom: 48}}
                    actions={[
                        {
                            icon: 'head-flash', label: 'Idea', onPress: () => console.log('Add item')
                        },
                        {
                            icon: 'notebook', label: 'Plan', onPress: () => console.log('Add plan')
                        },
                    ]}
                    onStateChange={onStateChange} />
            </Portal>
        </>
    );
}
