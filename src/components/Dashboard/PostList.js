import React from "react";
import PostCard from "../Post/PostCard/PostCard";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { fetchPostsIfNeeded } from "../store/actions/postActions";
import ReactLoading from "react-loading";
import Filter from "./Filter";
import {
  getVisiblePosts,
  pageUpdate,
  perPageUpdate
} from "../store/actions/filterActions";
import ReactPaginate from "react-paginate";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import styled from "styled-components";
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import './Pagination.css';

const cards = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-start"
};

const StyledDiv = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
`;

const StyledReactPaginate = styled(ReactPaginate) `
  display: inline-block;
  position: relative;
`

const StyledDropdown = styled(Dropdown) `
  display: inline-block;
  position: relative;
  justify-content:center;
`

const StyledDiv2 = styled.div`
  justify-content:center;
  display: flex;
      align-items: baseline;
`


class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.state = { dropdownOpen: false };
  }

  componentDidMount = () => {
    this.props.fetchPostsIfNeeded();
  };

  toggleDropDown() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    const posts = this.props.posts;
    const displayedPosts = this.props.displayedPosts;
    const { isFetching } = this.props;

    const { offset, perPage, currentPage } = this.props.pagination;
    const end = offset + perPage;
    const paginatedPosts = displayedPosts.slice(offset, end);

    // console.log("CURRENTLY_DISPLAYED_POSTS", displayedPosts);
    const showCards = posts => (
      <div>
        <div style={cards}>
          {posts &&
            posts.map(post => {
              return <PostCard post={post} key={post.pid} />;
            })}
          
        </div>
        <StyledDiv style={{position:"relative"}}>
            <StyledReactPaginate
              forcePage={currentPage}
              pageCount={Math.ceil(displayedPosts.length / perPage)}
              pageRangeDisplayed={3}
              onPageChange={this.props.pageUpdate} //HERE
              marginPagesDisplayed={2}
              previousLabel={<FiChevronsLeft />}
              nextLabel={<FiChevronsRight />}
              breakClassName={"break-me"}
              breakLabel={"..."}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"on"}
              // https://github.com/AdeleD/react-paginate#readme
            />
            <StyledDiv2>
            Number of posts per page
            <StyledDropdown
              isOpen={this.state.dropdownOpen}
              size="sm"
              toggle={this.toggleDropDown}
            >
              <DropdownToggle caret>{perPage}</DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Choose no of posts per page</DropdownItem>
                <DropdownItem onClick={this.props.perPageUpdate}>
                  1
                </DropdownItem>
                <DropdownItem onClick={this.props.perPageUpdate}>
                  2
                </DropdownItem>
                <DropdownItem onClick={this.props.perPageUpdate}>
                  3
                </DropdownItem>
                <DropdownItem onClick={this.props.perPageUpdate}>
                  4
                </DropdownItem>
                <DropdownItem onClick={this.props.perPageUpdate}>
                  5
                </DropdownItem>
              </DropdownMenu>
            </StyledDropdown>
            </StyledDiv2>
          </StyledDiv>
      </div>
    );
    return (
      <div>
        {isFetching ? (
          showSpinner()
        ) : posts ? (
          <div>
            <Filter />{" "}
            {displayedPosts.length > 0
              ? showCards(paginatedPosts)
              : showNoPostsToLoad()}
          </div>
        ) : (
          showNoPostsToLoad()
        )}
      </div>
    );
  }
}

const showSpinner = () => (
  <div>
    <p>FETCHING POSTS...</p>
    <ReactLoading type="spinningBubbles" color="#457cc9" />
  </div>
);

const showNoPostsToLoad = () => (
  <div>
    <p>NO POSTS TO LOAD</p>
  </div>
);

const mapStateToProps = state => {
  // console.log("STATE", state);
  return {
    users: state.firestore.data.users,
    posts: state.posts.data,
    displayedPosts: getVisiblePosts(state),
    isFetching: state.posts.isFetching,
    pagination: state.filter.pagination
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPostsIfNeeded: () => dispatch(fetchPostsIfNeeded()),
    pageUpdate: event => dispatch(pageUpdate(event)),
    perPageUpdate: event => dispatch(perPageUpdate(event))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "users" }, { collection: "posts" }])
)(PostList);
