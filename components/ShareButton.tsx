import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Button, Dialog, IconButton, Portal, Text } from "react-native-paper";

export default function ShareButton() {
    let [dialogVisible, setDialogVisible] = useState(false);

    const showDialog = () => setDialogVisible(true);
    const hideDialog = () => setDialogVisible(false);

    return (
        <>
            <TouchableOpacity onPressOut={showDialog}>
                    <IconButton icon="share-variant" size={24} />
            </TouchableOpacity>
            <Portal>
                <Dialog visible={dialogVisible} onDismiss={hideDialog}>
                    <Dialog.Icon icon="share-variant" />
                    <Dialog.Title>Share</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">
                            Share this event with your friends (WIP).
                        </Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>Dismiss</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </>
    );
}
