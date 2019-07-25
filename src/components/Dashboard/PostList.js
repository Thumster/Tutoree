import React from "react";
import PostCard from "../Post/PostCard/PostCard";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { fetchPostsIfNeeded } from "../store/actions/postActions";
import ReactLoading from "react-loading";
import Filter from "./Filter";
import { getVisiblePosts } from "../store/actions/filterActions";
import ReactPaginate from "react-paginate";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import styled from "styled-components";

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

class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.selectDropDown = this.selectDropDown.bind(this);
    this.state = { perPage: 5, offset: 0, dropdownOpen: false, currentPage: 0 };
  }

  componentDidMount = () => {
    this.props.fetchPostsIfNeeded();
  };

  handlePageClick = data => {
    console.log("DATA",data)
    let selected = data.selected;
    let offset = Math.ceil(selected * this.state.perPage);

    this.setState({ offset: offset, currentPage: selected });
  };

  toggleDropDown() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  selectDropDown(event) {
    this.setState({
      offset: 0,
      currentPage: 0,
      perPage: parseInt(event.target.innerText, 10)
    });
  }

  render() {
    const posts = this.props.posts;
    const displayedPosts = this.props.displayedPosts;
    const end = this.state.offset + this.state.perPage;
    const paginatedPosts = displayedPosts.slice(this.state.offset, end);
    // console.log("DISPLAYED_POSTS", displayedPosts);
    // console.log("PAGINATED_POSTS", paginatedPosts);

    const { isFetching } = this.props;
    const showCards = posts => (
      <div>
        {console.log("OFFSET", this.state.offset, "end", end, "currentPage", this.state.currentPage)}
        {console.log("POSTS", posts)}
        <div style={cards}>
          {posts &&
            posts.map(post => {
              return <PostCard post={post} key={post.pid} />;
            })}
          <StyledDiv>
            <ReactPaginate
              forcePage={this.state.currentPage}
              pageCount={Math.ceil(displayedPosts.length / this.state.perPage)}
              // pageRangeDisplayed={3}
              onPageChange={this.handlePageClick}
              marginPagesDisplayed={2}
              previousLabel={"previous"}
              nextLabel={"next"}
              breakClassName={"break-me"}
              breakLabel={"..."}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
              // https://github.com/AdeleD/react-paginate#readme
            />
            <Dropdown
              isOpen={this.state.dropdownOpen}
              size="sm"
              toggle={this.toggleDropDown}
            >
              <DropdownToggle caret>{this.state.perPage}</DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Choose no of posts per page</DropdownItem>
                <DropdownItem onClick={this.selectDropDown}>1</DropdownItem>
                <DropdownItem onClick={this.selectDropDown}>2</DropdownItem>
                <DropdownItem onClick={this.selectDropDown}>3</DropdownItem>
                <DropdownItem onClick={this.selectDropDown}>4</DropdownItem>
                <DropdownItem onClick={this.selectDropDown}>5</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </StyledDiv>
        </div>
      </div>
    );
    return (
      <div>
        {isFetching ? (
          showSpinner()
        ) : posts ? (
          <div>
            <Filter />{" "}
            {paginatedPosts.length > 0
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
    isFetching: state.posts.isFetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPostsIfNeeded: () => dispatch(fetchPostsIfNeeded())
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "users" }, { collection: "posts" }])
)(PostList);
