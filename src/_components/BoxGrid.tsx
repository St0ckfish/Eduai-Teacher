import React, { ReactNode } from "react";

interface BoxGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  columns?: number; 
  mdColumns?: number; 
  gap?: number;
}

/**
 * A simple grid component for displaying a list of Box components.
 *
 * @prop {ReactNode} children - The content to be rendered inside the grid.
 * @prop {number} [columns=2] - The number of columns in the grid.
 * @prop {number} [mdColumns=1] - The number of columns in the grid for viewports larger than md.
 * @prop {number} [gap=6] - The gap between grid items.
 * @prop {string} [className] - Additional CSS classes to apply to the grid.
 *
 * @example
 * <BoxGrid columns={3} mdColumns={2}>
 *   <Box>Box 1</Box>
 *   <Box>Box 2</Box>
 *   <Box>Box 3</Box>
 * </BoxGrid>
 */
const BoxGrid: React.FC<BoxGridProps> = ({ 
  children, 
  columns = 2, 
  mdColumns = 1, 
  gap = 6, 
  className = "", 
  ...props 
}) => {
  return (
    <div
      className={`grid grid-cols-${mdColumns} md:grid-cols-${columns} gap-${gap} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default BoxGrid;
