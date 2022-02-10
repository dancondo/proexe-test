import { Button, ButtonProps } from "react-bootstrap";

interface BaseButtonProps extends ButtonProps {
  loading?: boolean;
}

const BaseButton: React.FC<BaseButtonProps> = ({ loading, children, ...props }) => (
  <Button
    {...props}
    disabled={loading}
  >
    {
      loading ? 'Loading...': children 
    }
  </Button>
)

export default BaseButton
