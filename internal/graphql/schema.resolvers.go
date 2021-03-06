package graphql

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/marcustut/thebox/internal/graphql/generated"
	"github.com/marcustut/thebox/internal/graphql/model"
	"github.com/marcustut/thebox/internal/graphql/query"
	"github.com/marcustut/thebox/internal/postgresql"
)

func (r *clusterResolver) Teams(ctx context.Context, obj *model.Cluster) ([]*model.Team, error) {
	return query.GetManyTeam(ctx, r.db, model.PaginationInput{Limit: 50}, postgresql.Team.ClusterID.Equals(obj.ID))
}

func (r *commentResolver) User(ctx context.Context, obj *model.Comment) (*model.User, error) {
	return query.GetUniqueUser(ctx, r.db, postgresql.User.ID.Equals(obj.UserID))
}

func (r *commentResolver) Post(ctx context.Context, obj *model.Comment) (*model.Post, error) {
	return query.GetUniquePost(ctx, r.db, postgresql.Post.ID.Equals(obj.PostID))
}

func (r *commentResolver) Likes(ctx context.Context, obj *model.Comment) (int, error) {
	return query.GetUniqueCommentLikeCount(ctx, r.db, obj.ID)
}

func (r *discoveryResolver) Team(ctx context.Context, obj *model.Discovery) (*model.Team, error) {
	return query.GetUniqueTeam(ctx, r.db, postgresql.Team.ID.Equals(obj.TeamID))
}

func (r *discoveryResolver) Mission(ctx context.Context, obj *model.Discovery) (*model.Mission, error) {
	return query.GetUniqueMission(ctx, r.db, postgresql.Mission.ID.Equals(obj.MissionID))
}

func (r *escapeResolver) Team(ctx context.Context, obj *model.Escape) (*model.Team, error) {
	return query.GetUniqueTeam(ctx, r.db, postgresql.Team.ID.Equals(obj.TeamID))
}

func (r *humanityResolver) Team(ctx context.Context, obj *model.Humanity) (*model.Team, error) {
	return query.GetUniqueTeam(ctx, r.db, postgresql.Team.ID.Equals(obj.TeamID))
}

func (r *humanityResolver) Mission(ctx context.Context, obj *model.Humanity) (*model.Mission, error) {
	return query.GetUniqueMission(ctx, r.db, postgresql.Mission.ID.Equals(obj.MissionID))
}

func (r *invitationResolver) From(ctx context.Context, obj *model.Invitation) (*model.User, error) {
	return query.GetUniqueUser(ctx, r.db, postgresql.User.ID.EqualsIfPresent(obj.FromID))
}

func (r *invitationResolver) User(ctx context.Context, obj *model.Invitation) (*model.User, error) {
	return query.GetUniqueUser(ctx, r.db, postgresql.User.ID.Equals(obj.UserID))
}

func (r *invitationResolver) Team(ctx context.Context, obj *model.Invitation) (*model.Team, error) {
	return query.GetUniqueTeam(ctx, r.db, postgresql.Team.ID.Equals(obj.TeamID))
}

func (r *missionResolver) CompletedBy(ctx context.Context, obj *model.Mission) ([]*model.Team, error) {
	return query.GetManyTeam(ctx, r.db, model.PaginationInput{Limit: 50}, postgresql.Team.TeamMission.Some(postgresql.TeamMission.MissionID.Equals(obj.ID)))
}

func (r *mutationResolver) CreateUser(ctx context.Context, param model.NewUser) (*model.User, error) {
	return query.CreateUserWithTxUnsafe(ctx, r.db, &param)
}

func (r *mutationResolver) CreatePost(ctx context.Context, param model.NewPost) (*model.Post, error) {
	return query.CreatePost(ctx, r.db, &param)
}

func (r *mutationResolver) CreateComment(ctx context.Context, param model.NewComment) (*model.Comment, error) {
	return query.CreateComment(ctx, r.db, &param)
}

func (r *mutationResolver) CreateInvitation(ctx context.Context, param model.NewInvitation) (*model.Invitation, error) {
	return query.CreateInvitation(ctx, r.db, &param)
}

func (r *mutationResolver) CreateTeam(ctx context.Context, param model.NewTeam) (*model.Team, error) {
	return query.CreateTeam(ctx, r.db, &param)
}

func (r *mutationResolver) CreateBattlegroundRoom(ctx context.Context, param model.NewBattlegroundRoom) (*model.BattlegroundRoom, error) {
	return query.CreateBattlegroundRoom(ctx, r.db, &param)
}

func (r *mutationResolver) UpdateUser(ctx context.Context, userID string, param model.UpdateUserInput) (*model.User, error) {
	user, err := query.GetUniqueUser(ctx, r.db, postgresql.User.ID.Equals(userID))
	if err != nil {
		return nil, err
	}
	query.UpdateUniqueProfile(ctx, r.db, postgresql.Profile.ID.Equals(user.ProfileID), param.Profile)
	return query.UpdateUniqueUser(ctx, r.db, postgresql.User.ID.Equals(userID), &param)
}

func (r *mutationResolver) UpdateTeam(ctx context.Context, teamID string, param model.UpdateTeamInput) (*model.Team, error) {
	return query.UpdateUniqueTeam(ctx, r.db, postgresql.Team.ID.Equals(teamID), &param)
}

func (r *mutationResolver) UpdateBattlegroundRoom(ctx context.Context, code string, param model.UpdateBattlegroundRoomInput) (*model.BattlegroundRoom, error) {
	return query.UpdateUniqueBattlegroundRoom(ctx, r.db, postgresql.BattlegroundRoom.Code.Equals(code), &param)
}

func (r *mutationResolver) UpsertEscape(ctx context.Context, param model.UpsertEscapeInput) (*model.Escape, error) {
	return query.UpsertUniqueEscape(ctx, r.db, &param)
}

func (r *mutationResolver) UpsertSpeed(ctx context.Context, param model.UpsertSpeedInput) (*model.Speed, error) {
	return query.UpsertUniqueSpeed(ctx, r.db, &param)
}

func (r *mutationResolver) UpsertHumanity(ctx context.Context, param model.UpsertHumanityInput) (*model.Humanity, error) {
	return query.UpsertUniqueHumanity(ctx, r.db, &param)
}

func (r *mutationResolver) UpsertDiscovery(ctx context.Context, param model.UpsertDiscoveryInput) (*model.Discovery, error) {
	return query.UpsertUniqueDiscovery(ctx, r.db, &param)
}

func (r *mutationResolver) LikePost(ctx context.Context, param model.PostLikeInput) (*bool, error) {
	return query.CreatePostLike(ctx, r.db, &param)
}

func (r *mutationResolver) UnlikePost(ctx context.Context, param model.PostLikeInput) (*bool, error) {
	return query.DeletePostLike(ctx, r.db, &param)
}

func (r *mutationResolver) LikeComment(ctx context.Context, param model.CommentLikeInput) (*bool, error) {
	return query.CreateCommentLike(ctx, r.db, &param)
}

func (r *mutationResolver) UnlikeComment(ctx context.Context, param model.CommentLikeInput) (*bool, error) {
	return query.DeleteCommentLike(ctx, r.db, &param)
}

func (r *mutationResolver) AcceptInvitation(ctx context.Context, invitationID string) (*bool, error) {
	return query.AcceptInvitation(ctx, r.db, invitationID)
}

func (r *mutationResolver) RejectInvitation(ctx context.Context, invitationID string) (*bool, error) {
	return query.RejectInvitation(ctx, r.db, invitationID)
}

func (r *postResolver) User(ctx context.Context, obj *model.Post) (*model.User, error) {
	return query.GetUniqueUser(ctx, r.db, postgresql.User.ID.Equals(obj.UserID))
}

func (r *postResolver) Likes(ctx context.Context, obj *model.Post) (int, error) {
	return query.GetUniquePostLikeCount(ctx, r.db, obj.ID)
}

func (r *postResolver) Liked(ctx context.Context, obj *model.Post, userID string) (bool, error) {
	return query.GetUniquePostLiked(ctx, r.db, obj.ID, userID)
}

func (r *postResolver) Comments(ctx context.Context, obj *model.Post, page model.PaginationInput) ([]*model.Comment, error) {
	return query.GetManyComment(ctx, r.db, page, postgresql.Comment.PostID.Equals(obj.ID))
}

func (r *profileResolver) Address(ctx context.Context, obj *model.Profile) (*model.Address, error) {
	if obj.AddressID == nil {
		return nil, fmt.Errorf("profile %s does not have an address", obj.ID)
	}
	return query.GetUniqueAddress(ctx, r.db, postgresql.Address.ID.Equals(*obj.AddressID))
}

func (r *queryResolver) User(ctx context.Context, userID string) (*model.User, error) {
	return query.GetUniqueUser(ctx, r.db, postgresql.User.ID.Equals(userID))
}

func (r *queryResolver) Users(ctx context.Context, page model.PaginationInput) ([]*model.User, error) {
	return query.GetManyUser(ctx, r.db, page)
}

func (r *queryResolver) UserCount(ctx context.Context) (int, error) {
	return query.GetTotalUserCount(ctx, r.db)
}

func (r *queryResolver) Team(ctx context.Context, teamID string) (*model.Team, error) {
	return query.GetUniqueTeam(ctx, r.db, postgresql.Team.ID.Equals(teamID))
}

func (r *queryResolver) Teams(ctx context.Context, page model.PaginationInput) ([]*model.Team, error) {
	return query.GetManyTeam(ctx, r.db, page)
}

func (r *queryResolver) Escape(ctx context.Context, teamID string) (*model.Escape, error) {
	return query.GetUniqueEscape(ctx, r.db, postgresql.Escape.TeamID.Equals(teamID))
}

func (r *queryResolver) Speed(ctx context.Context, teamID string) (*model.Speed, error) {
	return query.GetUniqueSpeed(ctx, r.db, postgresql.Speed.TeamID.Equals(teamID))
}

func (r *queryResolver) Speeds(ctx context.Context, page model.PaginationInput) ([]*model.Speed, error) {
	return query.GetManySpeed(ctx, r.db, page)
}

func (r *queryResolver) Humanity(ctx context.Context, teamID string) (*model.Humanity, error) {
	return query.GetUniqueHumanity(ctx, r.db, postgresql.Humanity.TeamID.Equals(teamID))
}

func (r *queryResolver) Humanities(ctx context.Context, page model.PaginationInput) ([]*model.Humanity, error) {
	return query.GetManyHumanity(ctx, r.db, page)
}

func (r *queryResolver) Discovery(ctx context.Context, teamID string) (*model.Discovery, error) {
	return query.GetUniqueDiscovery(ctx, r.db, postgresql.Discovery.TeamID.Equals(teamID))
}

func (r *queryResolver) Cluster(ctx context.Context, clusterID string) (*model.Cluster, error) {
	return query.GetUniqueCluster(ctx, r.db, postgresql.Cluster.ID.Equals(clusterID))
}

func (r *queryResolver) Mission(ctx context.Context, missionID string) (*model.Mission, error) {
	return query.GetUniqueMission(ctx, r.db, postgresql.Mission.ID.Equals(missionID))
}

func (r *queryResolver) Missions(ctx context.Context, page model.PaginationInput) ([]*model.Mission, error) {
	return query.GetManyMission(ctx, r.db, page)
}

func (r *queryResolver) BattlegroundRoom(ctx context.Context, code string) (*model.BattlegroundRoom, error) {
	return query.GetUniqueBattlegroundRoom(ctx, r.db, postgresql.BattlegroundRoom.Code.Equals(code))
}

func (r *queryResolver) BattlegroundRooms(ctx context.Context, page model.PaginationInput) ([]*model.BattlegroundRoom, error) {
	return query.GetManyBattlegrounRoom(ctx, r.db, page)
}

func (r *queryResolver) BattlegroundRound(ctx context.Context, code string, round int) (*model.BattlegroundRound, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Post(ctx context.Context, postID string) (*model.Post, error) {
	return query.GetUniquePost(ctx, r.db, postgresql.Post.ID.Equals(postID))
}

func (r *queryResolver) Posts(ctx context.Context, page model.PaginationInput) ([]*model.Post, error) {
	return query.GetManyPost(ctx, r.db, page)
}

func (r *queryResolver) Invitations(ctx context.Context, userID string, page model.PaginationInput) ([]*model.Invitation, error) {
	return query.GetManyInvitation(ctx, r.db, page, postgresql.Invitation.UserID.Equals(userID))
}

func (r *speedResolver) Team(ctx context.Context, obj *model.Speed) (*model.Team, error) {
	return query.GetUniqueTeam(ctx, r.db, postgresql.Team.ID.Equals(obj.TeamID))
}

func (r *speedResolver) Mission(ctx context.Context, obj *model.Speed) (*model.Mission, error) {
	return query.GetUniqueMission(ctx, r.db, postgresql.Mission.ID.Equals(obj.MissionID))
}

func (r *teamResolver) Cluster(ctx context.Context, obj *model.Team) (*model.Cluster, error) {
	if obj.ClusterID == nil {
		// return nil, gqlerror.Errorf("team %s does not have a cluster", obj.ID)
		return nil, nil
	}
	return query.GetUniqueCluster(ctx, r.db, postgresql.Cluster.ID.Equals(*obj.ClusterID))
}

func (r *teamResolver) Completed(ctx context.Context, obj *model.Team, page model.PaginationInput) ([]*model.Mission, error) {
	return query.GetManyMission(ctx, r.db, page, postgresql.Mission.TeamMission.Some(postgresql.TeamMission.TeamID.Equals(obj.ID)))
}

func (r *teamResolver) Members(ctx context.Context, obj *model.Team) ([]*model.User, error) {
	return query.GetManyUser(ctx, r.db, model.PaginationInput{Limit: 100}, postgresql.User.TeamID.Equals(obj.ID))
}

func (r *userResolver) Profile(ctx context.Context, obj *model.User) (*model.Profile, error) {
	return query.GetUniqueProfile(ctx, r.db, postgresql.Profile.ID.Equals(obj.ProfileID))
}

func (r *userResolver) Team(ctx context.Context, obj *model.User) (*model.Team, error) {
	if obj.TeamID == nil {
		// return nil, gqlerror.Errorf("user %s does not have a team", obj.ID)
		return nil, nil
	}
	return query.GetUniqueTeam(ctx, r.db, postgresql.Team.ID.Equals(*obj.TeamID))
}

func (r *userResolver) Roles(ctx context.Context, obj *model.User) ([]model.Role, error) {
	return query.GetManyRoles(ctx, r.db, postgresql.UserRole.UserID.Equals(obj.ID))
}

// Cluster returns generated.ClusterResolver implementation.
func (r *Resolver) Cluster() generated.ClusterResolver { return &clusterResolver{r} }

// Comment returns generated.CommentResolver implementation.
func (r *Resolver) Comment() generated.CommentResolver { return &commentResolver{r} }

// Discovery returns generated.DiscoveryResolver implementation.
func (r *Resolver) Discovery() generated.DiscoveryResolver { return &discoveryResolver{r} }

// Escape returns generated.EscapeResolver implementation.
func (r *Resolver) Escape() generated.EscapeResolver { return &escapeResolver{r} }

// Humanity returns generated.HumanityResolver implementation.
func (r *Resolver) Humanity() generated.HumanityResolver { return &humanityResolver{r} }

// Invitation returns generated.InvitationResolver implementation.
func (r *Resolver) Invitation() generated.InvitationResolver { return &invitationResolver{r} }

// Mission returns generated.MissionResolver implementation.
func (r *Resolver) Mission() generated.MissionResolver { return &missionResolver{r} }

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Post returns generated.PostResolver implementation.
func (r *Resolver) Post() generated.PostResolver { return &postResolver{r} }

// Profile returns generated.ProfileResolver implementation.
func (r *Resolver) Profile() generated.ProfileResolver { return &profileResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

// Speed returns generated.SpeedResolver implementation.
func (r *Resolver) Speed() generated.SpeedResolver { return &speedResolver{r} }

// Team returns generated.TeamResolver implementation.
func (r *Resolver) Team() generated.TeamResolver { return &teamResolver{r} }

// User returns generated.UserResolver implementation.
func (r *Resolver) User() generated.UserResolver { return &userResolver{r} }

type clusterResolver struct{ *Resolver }
type commentResolver struct{ *Resolver }
type discoveryResolver struct{ *Resolver }
type escapeResolver struct{ *Resolver }
type humanityResolver struct{ *Resolver }
type invitationResolver struct{ *Resolver }
type missionResolver struct{ *Resolver }
type mutationResolver struct{ *Resolver }
type postResolver struct{ *Resolver }
type profileResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
type speedResolver struct{ *Resolver }
type teamResolver struct{ *Resolver }
type userResolver struct{ *Resolver }
