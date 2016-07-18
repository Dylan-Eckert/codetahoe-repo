module PostCommentReqs
  attr_accessor :title, :body, :size, :timestamp, :author

  def initialize title, body, size, timestamp, author
    @title = title
    @body = body
    @size = size
    @timestamp = timestamp
    @author = author
  end
end
