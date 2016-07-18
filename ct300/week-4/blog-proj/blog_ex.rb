  module BlogManagementSystem
    class Blogs
      attr_accessor :blog_posts, :blog_author
    end

    class Author
      attr_accessor :name, :activity, :contact, :reputation

      def initialize name, activity, contact, reputation
        @name = name
        @activity = activity
        @contact = contact
        @reputation = reputation
      end
    end

    class Posts
      attr_accessor :post_title, :post_body, :post_size, :post_timestamp, :post_author

      def initialize title, body, size, timestamp, author
        @title = title
        @body = body
        @size = size
        @timestamp = timestamp
        @author = author
      end
    end

    class Comments
      attr_accessor :comment_title, :comment_body, :comment_size, :comment_timestamp, :comment_author

      def initialize title, body, size, timestamp, author
        @title = title
        @body = body
        @size = size
        @timestamp = timestamp
        @author = author
      end
    end
  end
