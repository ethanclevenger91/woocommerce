/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
import classnames from 'classnames';
import { Button, Dropdown, NavigableMenu } from '@wordpress/components';
import { Icon } from '@wordpress/icons';
import Ellipsis from 'gridicons/dist/ellipsis';
import React, { MouseEvent, ReactNode } from 'react';

type CallbackProps = {
	isOpen: boolean;
	onToggle: () => void;
	onClose: () => void;
};

type EllipsisMenuProps = {
	/**
	 * The label shown when hovering/focusing on the icon button.
	 */
	label: string;
	/**
	 * A function returning `MenuTitle`/`MenuItem` components as a render prop. Arguments from Dropdown passed as function arguments.
	 */
	renderContent?: ( props: CallbackProps ) => ReactNode;
	/**
	 * Classname to add to ellipsis menu.
	 */
	className?: string;
	/**
	 * Callback function when dropdown button is clicked, it provides the click event.
	 */
	onToggle: ( e?: MouseEvent< HTMLButtonElement > ) => void;
};

/**
 * This is a dropdown menu hidden behind a vertical ellipsis icon. When clicked, the inner MenuItems are displayed.
 */

const EllipsisMenu: React.VFC< EllipsisMenuProps > = ( {
	label,
	renderContent,
	className,
	onToggle,
} ) => {
	if ( ! renderContent ) {
		return null;
	}

	const renderEllipsis = ( {
		onToggle: _onToggle,
		isOpen,
	}: CallbackProps ) => {
		const toggleClassname = classnames(
			'woocommerce-ellipsis-menu__toggle',
			{
				'is-opened': isOpen,
			}
		);

		return (
			<Button
				className={ toggleClassname }
				onClick={ ( e: MouseEvent< HTMLButtonElement > ) => {
					if ( onToggle ) {
						onToggle( e );
					}
					_onToggle();
				} }
				title={ label }
				aria-expanded={ isOpen }
			>
				<Icon icon={ <Ellipsis /> } />
			</Button>
		);
	};

	const renderMenu = ( renderContentArgs: CallbackProps ) => (
		<NavigableMenu className="woocommerce-ellipsis-menu__content">
			{ renderContent( renderContentArgs ) }
		</NavigableMenu>
	);

	return (
		<div className={ classnames( className, 'woocommerce-ellipsis-menu' ) }>
			<Dropdown
				contentClassName="woocommerce-ellipsis-menu__popover"
				position="bottom left"
				renderToggle={ renderEllipsis }
				renderContent={ renderMenu }
			/>
		</div>
	);
};

export default EllipsisMenu;