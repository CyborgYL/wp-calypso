/**
 * External dependencies
 */
import React from 'react';
import PureRenderMixin from 'react-pure-render/mixin';
import { omit, noop } from 'lodash';

/**
 * Internal dependencies
 */
import LikeActions from 'lib/like-store/actions';
import LikeButton from './button';
import LikeStore from 'lib/like-store/like-store';
import { recordAction, recordGaEvent, recordTrackForPost } from 'reader/stats';

const LikeButtonContainer = React.createClass( {
	propTypes: {
		siteId: React.PropTypes.number.isRequired,
		postId: React.PropTypes.number.isRequired,
		showZeroCount: React.PropTypes.bool,
		tagName: React.PropTypes.string,
		onLikeToggle: React.PropTypes.func
	},

	mixins: [ PureRenderMixin ],

	getDefaultProps() {
		return {
			onLikeToggle: noop
		};
	},

	getInitialState() {
		return this.getStateFromStores();
	},

	getStateFromStores( props = this.props, animateLike = true ) {
		return {
			likeCount: LikeStore.getLikeCountForPost( props.siteId, props.postId ) || 0,
			iLike: LikeStore.isPostLikedByCurrentUser( props.siteId, props.postId ),
			animateLike: animateLike
		};
	},

	componentWillReceiveProps( nextProps ) {
		if ( this.props.siteId !== nextProps.siteId ||
				this.props.postId !== nextProps.postId ) {
			const newState = this.getStateFromStores( nextProps, false );
			this.setState( newState );
		}
	},

	componentDidMount() {
		LikeStore.on( 'change', this.onStoreChange );
	},

	componentWillUnmount() {
		LikeStore.off( 'change', this.onStoreChange );
	},

	onStoreChange() {
		const newState = this.getStateFromStores();
		if ( newState.likeCount !== this.state.likeCount ||
				newState.iLike !== this.state.iLike ) {
			this.setState( newState );
		}
	},

	handleLikeToggle( liked ) {
		LikeActions[ liked ? 'likePost' : 'unlikePost' ]( this.props.siteId, this.props.postId );
		this.props.onLikeToggle( liked );

		recordAction( liked ? 'liked_post' : 'unliked_post' );
		recordGaEvent( liked ? 'Clicked Like Post' : 'Clicked Unlike Post' );
		recordTrackForPost( liked ? 'calypso_reader_article_liked' : 'calypso_reader_article_unliked', this.props.post,
				{ context: this.props.fullPost ? 'full-post' : 'card' } );
	},

	render() {
		const props = omit( this.props, [ 'siteId', 'postId' ] );
		return <LikeButton { ...props }
				likeCount={ this.state.likeCount }
				liked={ this.state.iLike }
				animateLike={ this.state.animateLike }
				onLikeToggle={ this.handleLikeToggle } />;
	}
} );

export default LikeButtonContainer;
