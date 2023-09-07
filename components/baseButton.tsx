import styles from '@/styles/components/baseButton.module.scss'
interface BaseButtonProps {
    text: string;
    onClick?: () => void;
}
export const BaseButton = (props: BaseButtonProps) => {
    return (
        <button onClick={props.onClick} className={styles.baseButton}>
            <p>{props.text}</p>
        </button>
    )
}